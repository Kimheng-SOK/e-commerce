<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Author;
use App\Models\User;

class AuthorController extends Controller
{
    public function createAuthor(Request $request)
    {
        $request->validate([
            'author_name' => 'required|string',
            'user_name' => 'required|string|unique:users,name',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $request->user_name,
            'email' => $request->user_name . '@example.com',
            'password' => Hash::make($request->password)
        ]);

        $author = Author::create([
            'user_id' => $user->id,
            'name' => $request->author_name
        ]);

        return response()->json(['author' => $author, 'user' => $user], 201);
    }


    public function fetchAuthors()
    {
        return response()->json(Author::with('user')->get());
    }
}
