<?php
	require_once('config.php');
	
	$db = new Db();
	$branches = $db->getBranches();
	
	foreach ($branches as $branch) {
		echo $branch->branch_name.';;';
	}	
?>