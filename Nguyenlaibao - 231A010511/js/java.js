// 1. DỮ LIỆU SẢN PHẨM
const products = [
    { name: "Áo thun nam", price: 150000, img: "images/anh3.jpg" },
    { name: "Áo hoodie", price: 320000, img: "images/anh4.jpg" },
    { name: "Quần jean", price: 280000, img: "images/anh5.jpg" },
    { name: "Áo sơ mi", price: 180000, img: "images/anh6.jpg" },
    { name: "Áo khoác", price: 250000, img: "images/anh2.jpg" }
];

// 2. QUẢN LÝ ĐĂNG KÝ / ĐĂNG NHẬP (MODAL)
let isRegisterMode = true;

function openAuth(mode) {
    document.getElementById('auth-modal').style.display = 'flex';
    if (mode === 'login' && isRegisterMode) toggleAuth();
    if (mode === 'register' && !isRegisterMode) toggleAuth();
}

function closeAuth() {
    document.getElementById('auth-modal').style.display = 'none';
}

function toggleAuth() {
    isRegisterMode = !isRegisterMode;
    const title = document.getElementById('auth-title');
    const nameField = document.getElementById('reg-name-field');
    const termsGroup = document.getElementById('terms-group');
    const btn = document.getElementById('btn-action');
    const text = document.getElementById('text-hint');

    title.innerText = isRegisterMode ? "Đăng ký" : "Đăng nhập";
    btn.innerText = isRegisterMode ? "Đăng ký" : "Đăng nhập";
    nameField.style.display = isRegisterMode ? "block" : "none";
    termsGroup.style.display = isRegisterMode ? "flex" : "none";
    text.innerText = isRegisterMode ? "Đã có tài khoản?" : "Chưa có tài khoản?";
}

function handleAuth() {
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-pass').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }
    if (pass.length < 8) {
        alert("Mật khẩu phải từ 8 ký tự!");
        return;
    }

    if (isRegisterMode) {
        localStorage.setItem('user', JSON.stringify({ email, pass }));
        alert("Đăng ký thành công!");
        toggleAuth();
    } else {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && email === user.email && pass === user.pass) {
            alert("Đăng nhập thành công!");
            closeAuth();
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    }
}

// 3. TÌM KIẾM SẢN PHẨM
function searchProduct() {
    const key = document.getElementById("search").value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product');
    let hasResult = false;

    productCards.forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        if (name.includes(key)) {
            card.style.display = "flex";
            hasResult = true;
        } else {
            card.style.display = "none";
        }
    });

    if (!hasResult) alert("Không tìm thấy sản phẩm!");
}

// 4. GIỎ HÀNG (CART)
let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    document.getElementById("cartCount").innerText = cart.length;
    alert(`✅ Đã thêm ${name} vào giỏ hàng`);
}

function showCart() {
    const list = document.getElementById("cartItems");
    list.innerHTML = "";
    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.price.toLocaleString()}đ 
                        <button onclick="removeItem(${index})" style="margin-left:10px">Xóa</button>`;
        list.appendChild(li);
    });
    document.getElementById("totalPrice").innerText = total.toLocaleString();
    document.getElementById("cartBox").style.display = "block";
}

function closeCart() {
    document.getElementById("cartBox").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }
    alert("🎉 Đặt hàng thành công!");
    cart = [];
    total = 0;
    document.getElementById("cartCount").innerText = 0;
    closeCart();
}

// 5. ĐỒNG HỒ ĐẾM NGƯỢC (TIMER)
function startTimer() {
    let timeLeft = 600; // 10 phút
    const timerDisplay = document.getElementById('timer');

    const countdown = setInterval(() => {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        
        timerDisplay.innerText = `${m}:${s < 10 ? "0" + s : s}`;

        if (timeLeft <= 60) {
            timerDisplay.style.color = "red";
            timerDisplay.classList.add("danger-animation");
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Hết giờ đặt hàng!");
        }
        timeLeft--;
    }, 1000);
}

// 6. KHỞI CHẠY KHI TẢI TRANG
window.onload = () => {
    startTimer();
    
    // Thêm sự kiện Enter cho ô tìm kiếm
    document.getElementById("search").addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchProduct();
    });
};
function render(list) {
    const container = document.getElementById("product-list");
    container.innerHTML = ""; // Xóa danh sách cũ

    list.forEach(p => {
        container.innerHTML += `
            <div class="product">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${p.price.toLocaleString()}đ</p>
                <button onclick="addToCart('${p.name}', ${p.price})">Mua ngay</button>
            </div>
        `;
    });
}