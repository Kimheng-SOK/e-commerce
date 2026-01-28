<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Author;

class ArticleController extends Controller
{
    public function createArticle(Request $request) 
    {
        $request->validate([
            'author_id' => 'required|exists:authors,id',
            'name' => 'required|string'
        ]);

        $article = Article::create([
            'author_id' => $request->author_id,
            'name' => $request->name
        ]);

        return response()->json($article, 201);
    }
}
