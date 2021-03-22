@extends("layouts.admin")

@section("content")

    <form method="Post" action="{{ route("admin.category.create") }}">
        {{ @csrf_field() }}
        <div class="form-group">
            <label for="name">Имя категории</label>
            <input class="form-control" value="{{ old("name") }}" name="name" type="text">
        </div>
        <div class="form-group">
            <label for="parent">
                <select class="form-control" name="parent">
                    <option value="0">Базовый</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                    @endforeach
                </select>
            </label>
        </div>
        <input class="btn btn-primary" type="submit" value="Создать">
    </form>

    <?php
    function show($categories) {
    ?>
    <ul class="list-group">
        <?php foreach ($categories as $category) { ?>
            <li class="list-group-item">
                <div class="row">
                    <div class="col-10">
                        <?= $category->name ?>
                    </div>
                    <form class="col-1" method="POST" action="{{ route("admin.category.delete") }}">
                        {{ @csrf_field() }}
                        <input type="hidden" name="id" value="<?= $category->id ?>">
                        <input class="btn btn-danger" type="submit" value="Удалить">
                    </form>
                </div>
                <?php
                if (!empty($category->categories())) {
                    show($category->categories());
                }
                ?>
            </li>
            </ul>
            <?php
        }
    }
    ?>
    <?php if(isset($categories)) show($categories->where("parent_id", 0)) ?>
@endsection
