<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <title>DB Rank AI</title>
    <meta name="description" content="😊I ❤ React👍. GodHad has 40 repositories available. Follow their code on GitHub.">
    <meta name="twitter:image" content="https://avatars.githubusercontent.com/u/155072724?v=4?s=400"/>
    <meta name="twitter:site" content="DB Rank AI"/>
    <meta property="og:site_name" content="DB Rank AI"/>
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="GodHad - Overview"/>
    <meta name="twitter:description" content="😊I ❤ React👍. GodHad has 40 repositories available. Follow their code on GitHub."/>
    <meta property="og:image" content="https://avatars.githubusercontent.com/u/155072724?v=4?s=400"/>
    <meta property="og:image:alt" content="😊I ❤ React👍. GodHad has 40 repositories available. Follow their code on GitHub."/>
    <meta property="og:title" content="GodHad - Overview"/>
    <meta property="og:url" content="https://github.com/GodHad"/>
    <meta property="og:description" content="😊I ❤ React👍. GodHad has 40 repositories available. Follow their code on GitHub."/>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body>
    @inertia
</body>
</html>
          