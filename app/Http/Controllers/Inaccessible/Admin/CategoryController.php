<?php

namespace App\Http\Controllers\Inaccessible\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function show()
    {
        $this->data['categories'] = Category::all();
        return view("private.admin.category", $this->data);
    }

    public function delete(Request $request)
    {
        Category::destroy($request->post('id'));
        return redirect()->back();
    }

    public function create(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $request->post();
        Category::create([
            'name' => $data['name'],
            'parent_id' => $data["parent"],
        ]);

        return redirect()->back();
    }
}
