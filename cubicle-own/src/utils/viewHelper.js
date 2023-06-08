// get the selected difficulty option / it is a view data
exports.getDifficultyOptionsViewData = function(difficultyLevel){
    const titles = [
      "Very Easy",
      "Easy",
      "Medium (Standard 3x3)",
      "Intermediate",
      "Expert",
      "Hardcore",
    ];

    const options = titles.map((title, index) => ({
      title: `${index + 1} - ${title}`,
      value: index + 1,
      selected: Number(difficultyLevel) === index + 1, // or add ? 'selected' : "" -> .hbs file {{selected}}
    }));

    return options;
};
