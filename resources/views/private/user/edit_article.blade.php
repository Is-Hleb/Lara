@extends("layouts.public")

@push("meta")
    <meta name="article_content" content="{{ $article->content }}">
    <meta name="make_edit_url" content="{{ route("user.article.make_edit") }}">
    <meta name="article_id" content="{{ $article->id }}">
@endpush

@section("content")
    <form method="POST" action="{{ route("user.article.make_edit") }}">
        {{ csrf_field() }}
        <div id="article"></div>
        <div class="d-none form-group" id="editBlock"></div>
        <div class="form-group mt-5 border-top">
            <div class="dropdown">
                <button class="btn btn-dark dropdown-toggle rounded-0" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Заголовок
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button class="dropdown-item" type="button" onclick="addTitle('h1')"><h1>Заголовок</h1></button>
                    <button class="dropdown-item" type="button" onclick="addTitle('h2')"><h2>Заголовок</h2></button>
                    <button class="dropdown-item" type="button" onclick="addTitle('h3')"><h3>Заголовок</h3></button>
                    <button class="dropdown-item" type="button" onclick="addTitle('h4')"><h4>Заголовок</h4></button>
                    <button class="dropdown-item" type="button" onclick="addTitle('h5')"><h5>Заголовок</h5></button>
                    <button class="dropdown-item" type="button" onclick="addTitle('h6')"><h6>Заголовок</h6></button>
                </div>
            </div>
        </div>
        <button class="btn btn-dark rounded-0" type="button" onclick="addHr()">Разделение</button>
        <button class="btn btn-dark rounded-0" type="button" onclick="addParagraph()">Параграф</button>
    </form>


@endsection
@push("scripts")
    <script type="text/javascript" src="{{ asset("js/article_edit.js") }}"></script>
@endpush
