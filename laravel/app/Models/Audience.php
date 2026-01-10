<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audience extends Model
{
    public function comments() : MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
