@extends("layouts.main")

@section("header")
    <div class="container-fluid col bg-success p-0">
        <h2 class="text-center p-5">Привет {{ Auth::user()->name }}</h2>
        <nav class="navbar navbar-expand-lg bg-light">
            <ul class="navbar-nav col">
                <li class="nav-item m-auto">
                    <a class="nav-link text-dark text-decoration-none" href="#">Главная</a>
                </li>
                <li class="nav-item m-auto">
                    <a class="nav-link text-dark text-decoration-none" href="#">Пользователи</a>
                </li>
                <li class="nav-item m-auto">
                    <a class="nav-link text-dark text-decoration-none" href="{{ route("admin.category.index") }}">Категории</a>
                </li>
                <li class="nav-item m-auto">
                    <a class="nav-link text-dark text-decoration-none" href="#">Жалобы</a>
                </li>
            </ul>
        </nav>
    </div>
@endsection

@section("navbar")

    <a class="btn btn-dark rounded-0 w-100 nav-item" href="{{ route("index") }}">Вернуться на главную</a>
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
            </ul>
        </div>
        <div class="card-footer">
            <form action="{{ route("logout") }}" method="POST">
                {{ csrf_field() }}
                <button class="m-auto nav-link btn btn-dark rounded-0 w-75">Выйти</button>
            </form>
        </div>
    </div>
@endsection
