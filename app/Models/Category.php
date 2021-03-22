<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Array_;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'parent_id',
    ];


    public static function destroy($ids)
    {
        if(!is_array($ids))
            $ids = [$ids];
        foreach ($ids as $id)
        {
            $categories = self::where("id", $id)->first()->categories();
            parent::destroy($id);
            foreach ($categories as $category)
            {
                self::destroy([$category->id]);
            }
        }
    }

    public function categories()
    {
        return self::where("parent_id", $this->id)->get();
    }

    public function articles()
    {
        $articles = Article::all();
        $out = [];
        foreach ($articles as $article)
        {
            $ids = unserialize($article->categories);
            if(in_array($this->id, ids))
                $out[] = $article;
        }
        return $articles;
    }

}
