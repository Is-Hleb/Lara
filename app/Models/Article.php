<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'author',
        'status',
        'categories',
        'title',
        'content',
        'likes',
        'dislikes'
    ];

    public $timestamps = true;

    public function author(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, "id", 'author');
    }

    public function categories()
    {
        $ids = unserialize($this->categories);
        return Category::find($ids)->get();
    }
}
