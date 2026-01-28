<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AudienceController extends Controller
{
    public function subcribe(Request $request)
    {
        $request->validate([
            'audience_name' => 'required|string',
            'user_name' => 'required|string|unique:users,name',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->user_name,
            'email' => $request->user_name . '@example.com',
            'password' => Hash::make($request->password),
        ]);
        
        $audience = Audience::create([
            'name' => $request->audience_name,
            'user_id' => $user->id,
        ]);
        return response()->json(['message' => $audience, 'user' => $user], 201);
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'audience_id' => 'required|exists:audiences,id',
            'article_ids' => 'required|array',
            'article_ids.*' => 'exists:articles,id'
        ]);

        $audience = Audience::findOrFail($request->audience_id);
        $audience->articles()->syncWithoutDetaching($request->article_ids);

        return response()->json(['message' => 'Subscribed successfully']);
    } 
}
