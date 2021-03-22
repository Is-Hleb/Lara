<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @stack("meta")
    <link rel="stylesheet" type="text/css" href="{{ asset("css/app.css") }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script type="text/javascript" src="{{ asset("js/app.js") }}" defer></script>
    <title>{{ config('app.name', 'Laravel') }}</title>
</head>

<body class="container-fluid bg-dark">
<header>
    @yield("header")
</header>
<main>
    <div class="container mt-4 p-2">
        <div class="row">
            <div class="col-3 mr-5 bg-light p-4">
                @yield("navbar")
            </div>
            <div class="col bg-light p-4">
                @yield("content")
            </div>
        </div>
    </div>
</main>
<footer>
    @yield("footer")
</footer>
</body>
@stack("scripts")
</html>
