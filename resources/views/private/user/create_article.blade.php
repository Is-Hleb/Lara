@extends("layouts.public")

@section("content")

    <?php
    function select($categories) {
    ?>
    <ul class="list-group">
        <?php foreach ($categories as $category) { ?>
        <li class="list-group-item bg-light p-0 pt-1 pl-4 border-0">
            <div class="row">
                <div class="form-check-inline">
                    <label class="form-check-input m-0 mr-1"><?= $category->name ?></label>
                    <input type="checkbox" class="form-check-label text-dark p-0 category" name="<?= $category->id ?>" value="<?= $category->id ?>" title="asdjhg">
                </div>
            </div>
            <?php
            if (!empty($category->categories())) {
                select($category->categories());
            }
            ?>
        </li>
    </ul>
    <?php
    }
    }
    ?>

    <form method="POST" action="{{ route("user.article.make_create") }}">
        {{ csrf_field() }}
        <div class="form-group">
            <input type="text" name="title" placeholder="Название Статьи" class="w-75 m-auto form-control">
        </div>
        <div class="form-group p-2">
            <?php if (isset($categories)) select($categories->where("parent_id", 0)) ?>
        </div>
        <input type="submit" value="Отправить">
    </form>

@endsection
