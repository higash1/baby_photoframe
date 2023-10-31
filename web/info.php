<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>Photoframe</title>
    <link rel="shortcut icon" href="img/photoframe.ico">
    <link rel="apple-touch-icon" href="img/photoframe-icon.png">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/slick.css"/>
    <link rel="stylesheet" href="css/photoframe.css">
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
    <div class="d-flex flex-column h-100">
        <div id="photoframe-clock-top" class="row d-none no-gutters bg-light">
            <div class="col-4">
                <div class="d-flex h-100 flex-column">
                    <img class="photoframe-logo" src="img/TasakiLab_Logo.svg"/>
                    <div class="photoframe-clock photoframe-clock-row2 photoframe-clock-time mt-auto mb-auto"></div>
                </div>
            </div>
            <div class="col-8">
                <div class="h-100">
                    <table class="table text-center photoframe-calendar"></table>
                </div>
            </div>
        </div>
        <div class="row no-gutters align-items-center flex-grow-1">
            <div id="photoframe-clock-left" class="col-4 h-100 bg-light">
                <div class="d-flex h-100 flex-column">
                    <img class="photoframe-logo" src="img/TasakiLab_Logo.svg"/>

                    <div class="d-flex justify-content-center mt-auto mb-auto">
                        <table class="table text-center photoframe-calendar"></table>
                    </div>

                    <div class="d-flex justify-content-center">
                        <div class="photoframe-clock photoframe-clock-row2 photoframe-clock-time"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div id="photoframe-slideshow" class="d-flex align-items-center h-100 photoframe-slideshow">
                    <?php
                        $pics_src = array_filter(glob('img/photoframe/{*.jpg,*.jpeg,*.JPG,*.JPEG,*.png,*.PNG,*.gif,*.GIF,*.bmp,*.BMP}', GLOB_BRACE), 'is_file');
                        foreach ($pics_src as &$pic_src) {
                            echo "<img class=\"photoframe-slide\" src=\"$pic_src\" />";
                        }
                    ?>
                </div>
            </div>

            <div id="photoframe-clock-right" class="col-4 h-100 bg-light d-none">
                <div class="d-flex h-100 flex-column">
                    <img class="photoframe-logo" src="img/TasakiLab_Logo.svg"/>

                    <div class="d-flex justify-content-center mt-auto mb-auto">
                        <table class="table text-center photoframe-calendar"></table>
                    </div>

                    <div class="d-flex justify-content-center">
                        <div class="photoframe-clock photoframe-clock-row2 photoframe-clock-time"></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="photoframe-clock-bottom" class="row d-none no-gutters bg-light">
            <div class="col-4">
                <div class="d-flex h-100 flex-column">
                    <img class="photoframe-logo" src="img/TasakiLab_Logo.svg"/>
                    <div class="photoframe-clock photoframe-clock-row2 photoframe-clock-time mt-auto mb-auto"></div>
                </div>
            </div>
            <div class="col-8">
                <div class="h-100">
                    <table class="table text-center photoframe-calendar"></table>
                </div>
            </div>
        </div>
    </div>
</body>

<script type="text/javascript" src="js/jquery.min.js"></script>
<script src="../js/popper.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/slick.min.js"></script>
<script type="text/javascript" src="js/photoframe.js"></script>