// get the selected platform option / it is a view data
exports.getPlatformOption = function () {
    const titles = [
        "-------",
        "PC",
        "Nintendo",
        "PS4",
        "PS5",
        "XBOX",
    ];

    const options = titles.map((title, index) => ({
        title: `${title}`,
        value: titles[index],
    }));

    return options;
};
