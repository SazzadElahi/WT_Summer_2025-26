<?php
include 'db_connect.php';

$message = "";
$row = [
    "id" => "", 
    "name" => "", 
    "email" => "", 
    "registration_no" => "", 
    "department" => ""
];

if (isset($_GET['id'])) {
    $id = $_GET['id'];
} elseif (isset($_POST['id'])) {
    $id = $_POST['id'];
} else {
    die("<h3 style='color:red;'>Error: Student ID is missing. <a href='index.php'>Go Back</a></h3>");
}

$sql = "SELECT * FROM students WHERE id = $id";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    die("<h3 style='color:red;'>Error: Student record not found. <a href='index.php'>Go Back</a></h3>");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $department = $_POST['department'];

    $update_sql = "UPDATE students SET name='$name', email='$email', department='$department' WHERE id=$id";

    if ($conn->query($update_sql) === TRUE) {
        header("Location: index.php?message=Student Record Updated Successfully");
        exit();
    } else {
        $message = "Error updating record: " . $conn->error;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Update Student</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Update Student Record</h2>
    
    <?php 
    if ($message != "") {
        echo "<p class='error-msg'>$message</p>"; 
    }
    ?>
    
    <form method="POST" action="">
        <input type="hidden" name="id" value="<?php echo htmlspecialchars($row['id']); ?>">
        
        <label>Name:</label>
        <input type="text" name="name" value="<?php echo htmlspecialchars($row['name']); ?>" required>
        
        <label>Email:</label>
        <input type="email" name="email" value="<?php echo htmlspecialchars($row['email']); ?>" required>
        
        <label>Registration Number (Read-only):</label>
        <input type="text" value="<?php echo htmlspecialchars($row['registration_no']); ?>" disabled>
        
        <label>Department:</label>
        <input type="text" name="department" value="<?php echo htmlspecialchars($row['department']); ?>" required>
        
        <input type="submit" value="Update Student">
    </form>
    <br>
    <a href="index.php" class="button-link">Back to Records</a>
</body>
</html>