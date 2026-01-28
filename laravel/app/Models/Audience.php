<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audience extends Model
{
    protected $fillable = ['article_id', 'user_id', 'name'];

    public function article(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_audience');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments() : MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
