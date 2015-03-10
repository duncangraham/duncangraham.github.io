var imagePath = "/images/majorprojects/";

var healthFacilityName = "health facility";
var tourismFacilityName = "tourism facility";
var schoolName = "school";
var k12schoolName = "k-12";
var psischoolName = "post-secondary";
var roadName = "roads";

var CAPITAL_PROJECT_NAMES = new Object();
CAPITAL_PROJECT_NAMES["HEALTH FACILITY PROJECTS"] = "healthfacility";
CAPITAL_PROJECT_NAMES["SENIORS & HOUSING PROJECTS"] = "seniorfacility";
CAPITAL_PROJECT_NAMES["PROVINCIAL FACILITIES & PROJECTS"] = "tourismfacility";

CAPITAL_PROJECT_NAMES["SCHOOLS K-12"] = "k-12";
CAPITAL_PROJECT_NAMES["POST-SECONDARY INSTITUTIONS"] = "post-secondary";
CAPITAL_PROJECT_NAMES["ROADS"] = "roads";
CAPITAL_PROJECT_NAMES["HIGHWAYS & BRIDGES"] = "roads";

//CAPITAL_PROJECT_NAMES["PROVINCIAL FACILITIES & PROJECT"] = "tourismfacility"; //remove this later
//CAPITAL_PROJECT_NAMES["HIGHWAY & BRIDGES"] = "roads"; //remove this later
//CAPITAL_PROJECT_NAMES["SCHOOL"] = "k-12"; //remove this later


var MAJOR_PROJECTS_STAGE_DESCRIPTIONS = new Object();
MAJOR_PROJECTS_STAGE_DESCRIPTIONS["PROPOSED"] = "Some project details are known, but construction has not begun.";
MAJOR_PROJECTS_STAGE_DESCRIPTIONS["CONSTRUCTION"] = "Project details are known and construction is under way.";
MAJOR_PROJECTS_STAGE_DESCRIPTIONS["COMPLETED"] = "Project is completed and will remain on the map for 30 days.";

var MAJOR_PROJECTS_STAGES = new Object();
MAJOR_PROJECTS_STAGES["PROPOSED"] = "0";
MAJOR_PROJECTS_STAGES["CONSTRUCTION"] = "1";
MAJOR_PROJECTS_STAGES["COMPLETED"] = "2";

var CAPITAL_PROJECTS_STAGES = new Object();
CAPITAL_PROJECTS_STAGES["PLANNING"] = "0";
CAPITAL_PROJECTS_STAGES["DESIGN"] = "1";
CAPITAL_PROJECTS_STAGES["TENDER"] = "2";
CAPITAL_PROJECTS_STAGES["CONSTRUCTION"] = "3";
CAPITAL_PROJECTS_STAGES["COMPLETION"] = "4";

var CENTRAL_ALBERTA_LAT = 52;
var CENTRAL_ALBERTA_LONG = -113;
var CENTRAL_ALBERTA = [CENTRAL_ALBERTA_LAT, CENTRAL_ALBERTA_LONG];

var ALBERTA_BOUNDS_SOUTH = 49;
var ALBERTA_BOUNDS_WEST = -120;
var ALBERTA_BOUNDS_SOUTHWEST = [ALBERTA_BOUNDS_SOUTH, ALBERTA_BOUNDS_WEST];
var ALBERTA_BOUNDS_NORTH = 60;
var ALBERTA_BOUNDS_EAST = -110;
var ALBERTA_BOUNDS_NORTHEAST = [ALBERTA_BOUNDS_NORTH, ALBERTA_BOUNDS_EAST];
