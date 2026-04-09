import engineeringAndSciences from './engineering-and-sciences.json';
import technology from './technology.json';
import humanitiesEducationAndSocialSciences from './humanities-education-and-social-sciences.json';
import nursing from './nursing.json';
import whiteLodgingSchoolOfHospitality from './white-lodging-school-of-hospitality-and-tourism-management.json';
import business from './business.json';

const professorData = [
  ...technology.map(p => ({ ...p, college: "College of Technology" })),
  ...engineeringAndSciences.map(p => ({ ...p, college: "College of Engineering and Sciences" })),
  ...humanitiesEducationAndSocialSciences.map(p => ({ ...p, college: "College of Humanities, Education and Social Sciences" })),
  ...business.map(p => ({ ...p, college: "College of Business" })),
  ...nursing.map(p => ({ ...p, college: "College of Nursing" })),
  ...whiteLodgingSchoolOfHospitality.map(p => ({ ...p, college: "White Lodging School of Hospitality and Tourism Management" }))
];

export default professorData;
