<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Trang chủ - Student Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/style.css" rel="stylesheet">
</head>
<body class="bg-soft">
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold" href="${pageContext.request.contextPath}/">Student Manager</a>
        <div class="d-flex">
            <span class="text-white-50 small">Xin chào!</span>
        </div>
    </div>
</nav>

<main class="container py-4">
    <div class="row g-4">
        <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white border-0 pb-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="mb-1">Danh sách sinh viên</h5>
                            <p class="text-muted small mb-0">Quản lý dữ liệu sinh viên nhanh chóng</p>
                        </div>
                        <span class="badge bg-soft-primary text-primary">${studentList.size()} sinh viên</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table align-middle table-hover">
                            <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Họ</th>
                                <th>Tên</th>
                                <th>Điểm</th>
                                <th class="text-center">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="student" items="${studentList}">
                                <tr>
                                    <td>${student.id}</td>
                                    <td>${student.email}</td>
                                    <td>${student.firstName}</td>
                                    <td>${student.lastName}</td>
                                    <td>
                                        <span class="badge bg-soft-success text-success">${student.marks}</span>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn btn-sm btn-warning me-2"
                                                data-bs-toggle="tooltip" title="Cập nhật"
                                                onclick="fillStudentData('${student.id}', '${student.email}', '${student.password}', '${student.firstName}', '${student.lastName}', '${student.marks}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9 3.502 9.189 9 3.697l.656 3.15-.656-.037.04 4.173L1 11.5v1.313L8.5 4.6l.306 3.431 3.294-3.294.354 3.294 2.147-2.147.5-.5zm-1.44-1.106l-.915.828-1.871-1.903 1.86-1.861z"/>
                                            </svg>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-danger"
                                                data-bs-toggle="tooltip" title="Xóa"
                                                onclick="confirmDelete('${student.id}', '${student.email}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 1a.5.5 0 0 0-.5.5v1h11v-1a.5.5 0 0 0-.5-.5h-3V1a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v1h-3z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white border-0 pb-0">
                    <h5 class="mb-1">Quản lý sinh viên</h5>
                    <p class="text-muted small mb-0">Thêm, cập nhật hoặc xóa hồ sơ</p>
                </div>
                <div class="card-body">
                    <form action="${pageContext.request.contextPath}/manageStudent" method="post">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <label class="form-label">ID</label>
                                <input type="text" class="form-control" id="txtID" name="txtID" placeholder="Nhập ID" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="txtEmail" name="txtEmail" placeholder="name@example.com" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Mật khẩu</label>
                                <input type="password" class="form-control" id="txtPassword" name="txtPassword" placeholder="••••••••" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Họ</label>
                                <input type="text" class="form-control" id="txtFirstName" name="txtFirstName" placeholder="Nguyễn" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Tên</label>
                                <input type="text" class="form-control" id="txtLastName" name="txtLastName" placeholder="An" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Điểm</label>
                                <input type="number" class="form-control" id="txtMark" name="txtMark" placeholder="0 - 10" min="0" max="10" step="0.1" required>
                            </div>
                        </div>

                        <div class="d-flex flex-wrap gap-2 mt-4">
                            <button type="submit" name="btnManageStudent" value="add" class="btn btn-success px-4">
                                Thêm mới
                            </button>
                            <button type="submit" name="btnManageStudent" value="update" class="btn btn-warning text-white px-4">
                                Cập nhật
                            </button>
                            <button type="button" class="btn btn-secondary px-4" onclick="clearForm()">
                                Làm sạch
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- Modal xác nhận xóa -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Xác nhận xóa</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Bạn có chắc chắn muốn xóa sinh viên <strong id="deleteStudentEmail"></strong>?</p>
                <p class="text-danger">Hành động này không thể hoàn tác!</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                <button type="button" class="btn btn-danger" onclick="deleteStudent()">Xóa</button>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script>
    let deleteStudentId = null;

    // Hàm điền dữ liệu vào form khi click update
    function fillStudentData(id, email, password, firstName, lastName, marks) {
        document.getElementById('txtID').value = id;
        document.getElementById('txtEmail').value = email;
        document.getElementById('txtPassword').value = password;
        document.getElementById('txtFirstName').value = firstName;
        document.getElementById('txtLastName').value = lastName;
        document.getElementById('txtMark').value = marks;

        // Cuộn tới form
        document.querySelector('.card-header').scrollIntoView({ behavior: 'smooth' });
    }

    // Hàm xóa form
    function clearForm() {
        document.getElementById('txtID').value = '';
        document.getElementById('txtEmail').value = '';
        document.getElementById('txtPassword').value = '';
        document.getElementById('txtFirstName').value = '';
        document.getElementById('txtLastName').value = '';
        document.getElementById('txtMark').value = '';
    }

    // Hàm xác nhận xóa
    function confirmDelete(id, email) {
        deleteStudentId = id;
        document.getElementById('deleteStudentEmail').textContent = email;
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    }

    // Hàm thực hiện xóa
    function deleteStudent() {
        if (deleteStudentId) {
            // Điền ID vào form và submit với action delete
            const form = document.querySelector('form');
            document.getElementById('txtID').value = deleteStudentId;

            // Tạo input ẩn để gửi action delete
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'btnManageStudent';
            input.value = 'delete';
            form.appendChild(input);

            form.submit();
        }
    }

    // Khởi tạo tooltips
    document.addEventListener('DOMContentLoaded', function() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    });
</script>
</body>
</html>
