function capitalize(str) {
    // 문자열을 받아 첫번째 문자를 대문자로 바꿔주는 함수
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    capitalize: capitalize
};