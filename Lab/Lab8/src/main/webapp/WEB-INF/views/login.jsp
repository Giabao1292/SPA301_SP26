<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng nhập - Student Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/style.css" rel="stylesheet">
</head>
<body class="bg-soft">
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card shadow-lg border-0 rounded-4">
                <div class="card-header text-center bg-gradient-primary text-white rounded-top-4">
                    <h4 class="mb-0">Student Manager</h4>
                    <p class="mb-0 small">Đăng nhập để tiếp tục</p>
                </div>
                <div class="card-body p-4">
                    <c:if test="${not empty error}">
                        <div class="alert alert-danger" role="alert">
                                ${error}
                        </div>
                    </c:if>
                    <form action="${pageContext.request.contextPath}/login" method="post">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="txtEmail" placeholder="name@example.com">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Mật khẩu</label>
                            <input type="password" class="form-control" id="password" name="txtPassword" placeholder="••••••••">
                        </div>
                        <div class="d-grid gap-2 d-sm-flex gap-2">
                            <button type="submit" class="btn btn-primary btn-lg flex-grow-1">Đăng nhập</button>
                            <button type="reset" class="btn btn-secondary btn-lg flex-grow-1">Huỷ</button>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-center bg-white border-0 pb-4">
                    <small class="text-muted">Chào mừng bạn đến với hệ thống quản lý sinh viên.</small>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>