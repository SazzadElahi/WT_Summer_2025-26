<?php
include 'db_connect.php';

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $registration_no = $_POST['registration_no'];
    $department = $_POST['department'];

    $sql = "INSERT INTO students (name, email, registration_no, department) VALUES ('$name', '$email', '$registration_no', '$department')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php?message=Student Record Added Successfully");
        exit();
    } else {
        $message = "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Add Student</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Add New Student</h2>
    
    <?php 
    if ($message != "") {
        echo "<p class='error-msg'>$message</p>"; 
    }
    ?>
    
    <form method="POST" action="">
        <label>Student Name:</label>
        <input type="text" name="name" required>
        
        <label>Email:</label>
        <input type="email" name="email" required>
        
        <label>Registration Number:</label>
        <input type="text" name="registration_no" required>
        
        <label>Department:</label>
        <input type="text" name="department" required>
        
        <input type="submit" value="Add Student">
    </form>
    <br>
    <a href="index.php" class="button-link">Back to Records</a>
</body>
</html>