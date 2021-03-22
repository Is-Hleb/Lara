@extends("layouts.main")

@section("header")
    <div class="container-fluid bg-light border-bottom shadow">
        <h1 class="text-center py-4">{{ config('app.name', 'Laravel') }}</h1>
    </div>
@endsection

@section("navbar")
    @guest()
        <div class="card mb-3">
            <div class="card-header">
                <h4>Регистрация</h4>
            </div>
            <div class="card-body">
                <p>Зарегистрируйся, чтобы иметь возможность что-то делать</p>
            </div>
            <div class="card-footer">
                <a href="{{ route("login") }}" class="m-auto nav-link w-75 btn btn-dark"> Авторизация</a>
                <hr>
                <a href="{{ route("register") }}" class="m-auto nav-link w-75 btn btn-dark"> Регистрация</a>
            </div>
        </div>
    @else
        <div class="card mb-3">
            <div class="card-header">
                <a class="nav-link text-decoration-none text-dark" href="#"><h4
                        class="text-center">{{ Auth::user()->name }}</h4></a>
            </div>
            <div class="card-body">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="#" class="nav-link text-dark">Мои публикации</a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route("user.article.show_create") }}" class="nav-link text-dark">Создать статью</a>
                    </li>
                    @if(Auth::user()->admin())
                        <li class="nav-item">
                            <a href="{{ route("admin.index") }}" class="nav-link text-dark">Панель администрирования</a>
                        </li>
                    @endif
                </ul>
            </div>
            <div class="card-footer">
                <form action="{{ route("logout") }}" method="POST">
                    {{ csrf_field() }}
                    <button class="m-auto nav-link btn btn-dark rounded-0 w-75">Выйти</button>
                </form>
            </div>
        </div>
    @endguest
    <?php
    function show($categories) {
    ?>
    <ul class="list-group">
        <?php foreach ($categories as $category) { ?>
        <li class="list-group-item bg-light pl-4 border-0">
            <div class="row">
                <div class="col-10 p-0">
                    <a class="nav-link text-dark p-0" href="#"><?= $category->name ?></a>
                </div>
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
    <div class="border p-2">
        <?php if (isset($categories)) show($categories->where("parent_id", 0)) ?>
    </div>
@endsection
