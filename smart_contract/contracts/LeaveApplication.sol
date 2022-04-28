// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LeaveApplication {

    struct Application { 
        address studentKey;
        string subject;
        string reason;
        uint startDate;
        uint endDate;
        address[] approvels;
        uint approveLevel;
    }

    address system_admin;
    mapping (address => bool) public AdminList;
    mapping (address => Application[]) public ApplicationRegistry;

    event NewApplicationCreated(address _applier, Application _app, uint _date);
    event ApplicationGranted(address _applier, address indexed _approver, Application _app, uint _date);
    event ApplicationRejected(address _applier, address indexed _approver, Application _app, uint _date);

    constructor() {
        system_admin = msg.sender;
        AdminList[system_admin] = true;
    }

   
    function applyLeave(string memory _sub, string memory _reason, uint _startDate, uint _endDate) public {
        Application memory _app = Application({
            studentKey: msg.sender, 
            subject: _sub, 
            reason: _reason, 
            startDate: _startDate, 
            endDate: _endDate,
            approvels: new address[] (0),
            approveLevel: 1
        });
        
        ApplicationRegistry[msg.sender].push(_app);
        emit NewApplicationCreated(msg.sender, _app, block.timestamp);
    }


    function makeAdmin(address _admin) public {
        require(msg.sender == system_admin, "makeAdmin: Unpriviledged");
        AdminList[_admin] = true;
    }

    function grantLeave(address _key) public {
        require(AdminList[msg.sender], "grantLeave: Unpriviledged");
        uint applicationIndex = _getTotalApplicationOfStudent(_key) - 1;
        require(ApplicationRegistry[_key][applicationIndex].approveLevel > 0, "grantLeave: Already rejected");
        ApplicationRegistry[_key][applicationIndex].approvels.push(msg.sender);
        ApplicationRegistry[_key][applicationIndex].approveLevel++;

        emit ApplicationGranted(_key, msg.sender, ApplicationRegistry[_key][applicationIndex], block.timestamp);
    }

    function rejectLeave(address _key) public {
        require(AdminList[msg.sender], "rejectLeave: Unpriviledged");
        uint applicationIndex = _getTotalApplicationOfStudent(_key) - 1;
        require(ApplicationRegistry[_key][applicationIndex].approveLevel > 0, "rejectLeave: Already rejected");
        ApplicationRegistry[_key][applicationIndex].approvels.push(msg.sender);
        ApplicationRegistry[_key][applicationIndex].approveLevel = 0;
        emit ApplicationRejected(_key, msg.sender, ApplicationRegistry[_key][applicationIndex], block.timestamp);
    }

    function getApplicationsByStudentId(address key) public view returns (Application[] memory) {
        return (ApplicationRegistry[key]);
    }

    function _getTotalApplicationOfStudent(address key) private view returns (uint){
        return ApplicationRegistry[key].length;
    }

}