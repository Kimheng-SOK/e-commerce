<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['name', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function articles() 
    {
        return $this->hasMany(Article::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function audiences(): HasManyThrough
    {
        return $this->hasManyThrough(Audience::class, Article::class);
    }
}
