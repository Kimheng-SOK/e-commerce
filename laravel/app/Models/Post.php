<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'author_id',
        'published_at',
    ];

    public function editor () 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
