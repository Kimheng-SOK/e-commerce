<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = DB::table('users')->where('email', 'kimheng@gmail.com')->first();

        DB::table('posts')->insert([
            'title' => 'First Post',
            'content' => 'This is the content of the first post.',
            'published_at' => now(),
            'user_id' => $user->id,
        ]);

        DB::table('posts')->insert([
            'title' => 'Second Post',
            'content' => 'This is the content of the second post.',
            'published_at' => now(),
            'user_id' => $user->id,
        ]);
    }
}
