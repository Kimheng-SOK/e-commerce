<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    protected $fillable = ['author_id', 'name'];

    public function author() 
    {
        return $this->belongsTo(Author::class);
    }

    public function audiences() : BelongsToMany
    {
        return $this->belongsToMany(Audience::class, 'article_audience');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
