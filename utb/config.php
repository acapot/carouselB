<?php
	session_start();
	
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');
	mb_language('uni');
	mb_regex_encoding('UTF-8');
	ob_start('mb_output_handler');			
	
	define('ROOT_PATH', dirname(__FILE__));
	
	/*define('DB_USER', 'root');
  	define('DB_PASS', '');
  	define('DB_NAME', '121512-booktime');
  	define('DB_HOST', 'localhost');*/
	
	define('DB_USER', '121512-dj63667');
  	define('DB_PASS', 'booktime');
  	define('DB_NAME', '121512-booktime');
  	define('DB_HOST', 'mysql10.citynetwork.se');
	
	require_once(ROOT_PATH.'/includes.php');