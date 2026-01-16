<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getCategories() {
        $this->authorize('viewAny', Category::class);
        return Category::all();
    }

    public function createCategory(Request $request) {
        abort_unless(auth()->user()->can('categories.create'), 403);
        $this->authorize('create', Category::class);
        $category = Category::create($request->all());
        return $category;
    }

    public function getCategory($categoryId) {
        $category = Category::findOrFail($categoryId);
        $this->authorize('view', $category);
        return $category;   
    }


    public function updateCategory(Request $request, $categoryId) {
        abort_unless(auth()->user()->can('categories.update'), 403);
        $category = Category::findOrFail($categoryId);
        $this->authorize('update', $category);
        $category->update($request->all());
        return $category;
    }

    public function updateCategoryStatus(Request $request, $categoryId) {
        $category = Category::findOrFail($categoryId);
        $this->authorize('updateStatus', $category);
        $category->status = $request->input('status');
        $category->save();
        return $category;
    }

    public function deleteCategory($categoryId) {
        $category = Category::findOrFail($categoryId);
        $this->authorize('delete', $category);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
   
}
