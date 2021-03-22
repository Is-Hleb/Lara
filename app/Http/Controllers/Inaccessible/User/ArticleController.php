<?php

namespace App\Http\Controllers\Inaccessible\User;

use App\Http\Controllers\Controller;
use App\Models\Article;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->loadPublicInfo();
    }

    public function show_edit($id)
    {
        $article = Article::where("id", '=', $id)->first();
        if($article && $article->author == Auth::user()->id)
        {
            $this->data["article"] = $article;
            return $this->display("private.user.edit_article");
        }
        return \response("", 404);
    }

    public function make_edit(Request $request)
    {
        $id = $request->post('id');
        // return \response($request->post(), 200);
        $article = Article::find($id);
        if(!$article)
            return \response("Article not font", 500);
        if ($article->author != Auth::user()->id)
            return \response("Не играйся!!! Бан недалеко...", 500);

        $article->content = $request->post("content");
        $article->save();


        return \response($id, 200);

    }

    public function show_create()
    {
        return $this->display("private.user.create_article");
    }

    public function make_create(Request $request)
    {
        $data = $request->post();
        $categories_ids = [];

        foreach ($data as $k => $v)
        {
            if($k == $v && is_numeric($v))
                $categories_ids[] = $v;
        }
        $id = Article::create([
           "author" => Auth::user()->id,
            "categories" => serialize($categories_ids),
            "title" => $data["title"],
        ]);
        return redirect()->route("user.article.show_edit", $id);
    }

}
