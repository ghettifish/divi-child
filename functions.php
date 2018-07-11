<?php 
function dg_enqueue_styles() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}

add_action('wp_enqueue_scripts', 'dg_enqueue_styles' );

function theme_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/dist/style.min.css', array(), null );
    wp_enqueue_script('child-scripts', get_stylesheet_directory_uri() . '/js/app.js');
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles');

@include "dg-fonts.php";

 

