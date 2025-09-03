export const calculateGPA = (courses) => {
  if (!courses || courses.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    const grade = calculateCourseGrade(course);
    if (grade !== null) {
      totalPoints += getGradePoints(grade) * course.credits;
      totalCredits += course.credits;
    }
  });
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

export const calculateCourseGrade = (course) => {
  if (!course.gradeCategories || course.gradeCategories.length === 0) return null;
  
  let totalWeight = 0;
  let weightedScore = 0;
  
  course.gradeCategories.forEach(category => {
    if (category.currentGrade !== null && category.currentGrade !== undefined) {
      weightedScore += (category.currentGrade * category.weight) / 100;
      totalWeight += category.weight;
    }
  });
  
  return totalWeight > 0 ? (weightedScore / totalWeight) * 100 : null;
};

export const getGradePoints = (grade) => {
  if (grade >= 97) return 4.0;
  if (grade >= 93) return 3.7;
  if (grade >= 90) return 3.3;
  if (grade >= 87) return 3.0;
  if (grade >= 83) return 2.7;
  if (grade >= 80) return 2.3;
  if (grade >= 77) return 2.0;
  if (grade >= 73) return 1.7;
  if (grade >= 70) return 1.3;
  if (grade >= 67) return 1.0;
  if (grade >= 65) return 0.7;
  return 0.0;
};

export const getLetterGrade = (grade) => {
  if (grade >= 97) return 'A+';
  if (grade >= 93) return 'A';
  if (grade >= 90) return 'A-';
  if (grade >= 87) return 'B+';
  if (grade >= 83) return 'B';
  if (grade >= 80) return 'B-';
  if (grade >= 77) return 'C+';
  if (grade >= 73) return 'C';
  if (grade >= 70) return 'C-';
  if (grade >= 67) return 'D+';
  if (grade >= 65) return 'D';
  return 'F';
};