import { defineStore} from "pinia";
import type { CategoryItem } from '@/types';
import { apiUrl } from "@/api";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categoryList: [] as CategoryItem[],
        selectedCategoryName: "Popular Marvel" as string
    }),
    actions: {
        async fetchCategories() {
            const response = await fetch(`${apiUrl}/categories/`);
            const data = await response.json();
            this.categoryList = data as CategoryItem[];
        },
        setSelectedCategoryName(categoryName: string) {
            this.selectedCategoryName = categoryName;
        }
    }
});