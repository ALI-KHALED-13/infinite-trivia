


export const getMarkingCommand = (option:IOption, isSelected:boolean) => {
  if (isSelected){
    return option.isCorrect? 'markCorrect': 'markWrong'
  }else {//not selected
    if (option.isCorrect) return "revealCorrect"
  }
};