// Данные тестов (в реальном приложении это может быть API)
const tests = [
    {
        id: 1,
        name: "Тест нагрузки на сервер",
        description: "Тестирование производительности сервера под высокой нагрузкой",
        duration: "30 минут",
        status: "Готов"
    },
    {
        id: 2,
        name: "Тест нагрузки на базу данных",
        description: "Тестирование производительности базы данных под высокой нагрузкой",
        duration: "45 минут",
        status: "Готов"
    },
    {
        id: 3,
        name: "Тест нагрузки на API",
        description: "Тестирование производительности API под высокой нагрузкой",
        duration: "20 минут",
        status: "В разработке"
    }
];

// Функция для отображения списка тестов
function displayTests() {
    const testsList = document.getElementById('tests');
    testsList.innerHTML = '';

    tests.forEach(test => {
        const li = document.createElement('li');
        li.textContent = test.name;
        li.addEventListener('click', () => showTestDetails(test));
        testsList.appendChild(li);
    });
}

// Функция для отображения деталей теста
function showTestDetails(test) {
    const testInfo = document.getElementById('test-info');
    testInfo.innerHTML = `
        <h3>${test.name}</h3>
        <p><strong>Описание:</strong> ${test.description}</p>
        <p><strong>Продолжительность:</strong> ${test.duration}</p>
        <p><strong>Статус:</strong> ${test.status}</p>
    `;

    const testDetails = document.getElementById('test-details');
    testDetails.style.display = 'block';
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    displayTests();
});
