<script setup lang="ts">
import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";
import { useCartStore } from "@/stores/cart";
import { useCategoryStore } from "@/stores/category";
import { asDollarsAndCents } from "@/utils"
import { isCreditCard, isMobilePhone} from "@/validators";
import CheckoutFieldError from "@/components/CheckoutFieldError.vue";
import {useRouter} from "vue-router";
import type {OrderDetails, ServerErrorResponse} from "@/types";
import {useOrderDetailsStore} from "@/stores/orderDetails";

const router = useRouter();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const orderDetailsStore = useOrderDetailsStore();
const cart = cartStore.cart;
const defaultServerErrorMessage = "An unexpected error occurred, please try again."
const serverErrorMessage = ref(defaultServerErrorMessage);

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const expYears: number[] = Array.from({length: 15}, (_, i) => i + yearFrom(0))

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      maxLength(45)
    ),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
        "Address must have at least 4 letters.",
        minLength(4)
    ),
    maxLength: helpers.withMessage(
        "Address can have at most 45 letters.",
        maxLength(45)
    ),
  },
  phone: {
    required: helpers.withMessage("Please provide a phone number.", required),
    isMobilePhone: helpers.withMessage("Please provide a valid phone number.", isMobilePhone),
  },
  email: {
    required: helpers.withMessage("Please provide an email address.", required),
    email,
  },
  ccNumber: {
    required: helpers.withMessage("Please provide a credit card number.", required),
    isCreditCard: helpers.withMessage("Please provide a valid credit card number.", isCreditCard),
  },
};
const v$ = useVuelidate(rules, form);

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    try {
      form.checkoutStatus = "PENDING";
      serverErrorMessage.value = defaultServerErrorMessage;

      const placeOrderResponse: OrderDetails | ServerErrorResponse =
          await cartStore
              .placeOrder({
                name: form.name,
                address: form.address,
                phone: form.phone,
                email: form.email,
                ccNumber: form.ccNumber,
                ccExpiryMonth: form.ccExpiryMonth,
                ccExpiryYear: form.ccExpiryYear,
              })

      if ("error" in placeOrderResponse) {
        form.checkoutStatus = "SERVER_ERROR";
        serverErrorMessage.value = placeOrderResponse.message
        console.log("Error placing order", placeOrderResponse);
      } else {
        form.checkoutStatus = "OK";
        orderDetailsStore.setOrderDetails(placeOrderResponse as OrderDetails);
        await router.push({name: "confirmation-view"});
      }

    } catch (e) {
      form.checkoutStatus = "SERVER_ERROR";
      serverErrorMessage.value = defaultServerErrorMessage;
      console.log("Error placing order", e);
    }
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}
</script>

<style scoped>
.checkout-page {
  display: flex;
  background: var(--off-white-primary);
  color: black;
  flex-wrap: wrap;
  justify-content: center;
}

.checkout-title {
  width: 100%;
  color: black;
  font-weight: normal;
  font-size: 30px;
  text-align: center;
}

.checkout-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  row-gap: 2rem;
}

.cart-action-btn {
  font-size: 20px;
}

.checkout-page-body {
  display: flex;
  padding: 1em;
}

form {
  display: flex;
  flex-direction: column;
}

.form-field-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 0.75rem;
  color: red;
}

.form-field {
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: black;
}

form > div > input,
form > div > select {
  background-color: lightgrey;
  border: 1px solid black;
  justify-content: flex-end;
  margin: 0;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
}

.complete-checkout {
  align-self: center;
  width: 75%;
  text-align: center;
}

.total-info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
}

</style>

<template>
  <div class="checkout-page">
    <div class="checkout-title">Checkout Information</div>
    <div class="checkout-empty" v-if="cart.empty">
      <div>Your cart is empty, you must add a comic in order to checkout.</div>
      <div>
        <router-link :to="{ name: 'category-view', params: { name: categoryStore.selectedCategoryName }}">
          <button class="secondary-btn button cart-action-btn default-text">
            Continue Shopping
          </button>
        </router-link>
      </div>
    </div>
    <section class="checkout-page-body" v-if="!cart.empty">
      <form @submit.prevent="submitOrder">
        <div class="form-field-group">
          <div class="form-field">
            <label for="name">Name</label>
            <input type="text" size="20" id="name" name="name" v-model.lazy="v$.name.$model" />
          </div>
          <checkout-field-error :field-name="v$.name"></checkout-field-error>
        </div>

        <div class="form-field-group">
          <div class="form-field">
            <label for="address">Address</label>
            <input type="text" size="20" id="address" name="address" v-model.lazy="v$.address.$model" />
          </div>
          <checkout-field-error :field-name="v$.address"></checkout-field-error>
        </div>

        <div class="form-field-group">
          <div class="form-field">
            <label for="phone">Phone</label>
            <input type="text" size="20" id="phone" name="phone" v-model.lazy="v$.phone.$model" />
          </div>
          <checkout-field-error :field-name="v$.phone"></checkout-field-error>
        </div>

        <div class="form-field-group">
          <div class="form-field">
            <label for="email">Email</label>
            <input type="text" size="20" id="email" name="email" v-model.lazy="v$.email.$model" />
          </div>
          <checkout-field-error :field-name="v$.email"></checkout-field-error>
        </div>

        <div class="form-field-group">
          <div class="form-field">
            <label for="ccNumber">Credit Card</label>
            <input type="text" size="20" id="ccNumber" name="ccNumber" v-model.lazy="v$.ccNumber.$model" />
          </div>
          <checkout-field-error :field-name="v$.ccNumber"></checkout-field-error>
        </div>

        <div class="form-field-group">
          <div class="form-field">
            <label>Exp Date</label>
            <select v-model="v$.ccExpiryMonth">
              <option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="index + 1"
              >
                {{ month }} ({{ index + 1 }})
              </option>
            </select>
            <select v-model="v$.ccExpiryYear">
              <option
                  v-for="(year) in expYears"
                  :key="year"
                  :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <input
          type="submit"
          name="submit"
          class="button primary-btn complete-checkout"
          :disabled="form.checkoutStatus === 'PENDING'"
          value="Complete Purchase"
        />

        <div class="total-info">
          <div>Your credit card will be charged <b>{{ asDollarsAndCents(cart.total)}}</b></div>
          <div>
            (<b>{{ asDollarsAndCents(cart.subtotal) }}</b> + <b>{{ asDollarsAndCents(cart.subtotal) }}</b> shipping)
          </div>
        </div>
      </form>

      <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
        <div v-if="form.checkoutStatus === 'ERROR'">
          Error: Please fix the problems above and try again.
        </div>

        <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

        <div v-else-if="form.checkoutStatus === 'OK'">Order placed...</div>

        <div v-else>An unexpected error occurred, please try again.</div>
      </section>
    </section>
  </div>
</template>
