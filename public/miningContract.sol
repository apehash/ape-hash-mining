// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be NOT_ENTERED
        if (_status == ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }

        // Any calls to nonReentrant after this point will fail
        _status = ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}

contract MiningMachines is Ownable, ReentrancyGuard {
    IERC20 public buyToken;
    IERC20 public rewardToken;

    address public treasury;

    struct MachineConfig {
        uint256 price;
        uint256 duration;
        uint256 tokensPerDay;
        bool active;
    }

    struct UserMachine {
        uint256 machineId;
        uint256 startTime;
        uint256 endTime;
        uint256 tokensPerDay;
        uint256 lastClaimedTime;
    }

    uint256 public machineIndex;
    mapping(uint256 => MachineConfig) public machineConfigs;
    mapping(address => UserMachine[]) public userMachines;
    mapping(address => bool) private _user;

    uint256 public totalPurchased;
    uint256 public totalClaimed;
    uint256 public totaluser;

    constructor(address _tokenaddress, address _adminwallet) Ownable(msg.sender) {
        rewardToken = IERC20(_tokenaddress);
        buyToken = IERC20(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913); //USDC
        treasury = _adminwallet;

        addMachineConfig(10e6,7 days,104000e18,true);
        addMachineConfig(25e6,10 days,170000e18,true);
        addMachineConfig(100e6,20 days,420000e18,true);
        addMachineConfig(150e6,30 days,450000e18,true);
    }

    // --- ADMIN FUNCTIONS ---

    function addMachineConfig(
        uint256 price,
        uint256 duration,
        uint256 tokensPerDay,
        bool active
    ) public onlyOwner {
        machineConfigs[machineIndex] = MachineConfig(price, duration, tokensPerDay, active);
        machineIndex++;
    }

    function updateMachineConfig(
        uint256 machineId,
        uint256 price,
        uint256 duration,
        uint256 tokensPerDay,
        bool active
    ) external onlyOwner {
        require(machineId < machineIndex, "Invalid machine ID");
        machineConfigs[machineId] = MachineConfig(price, duration, tokensPerDay, active);
    }

    // --- USER FUNCTIONS ---

    function buyMachine(uint256 machineId) external {
        MachineConfig memory config = machineConfigs[machineId];
        require(config.active, "Inactive machine");
        require(config.price > 0, "Machine does not exist");

        require(buyToken.transferFrom(msg.sender, treasury, config.price), "Payment failed");
        totalPurchased += config.price;

        if(!_user[msg.sender]) totaluser++;

        userMachines[msg.sender].push(UserMachine({
            machineId: machineId,
            startTime: block.timestamp,
            endTime: block.timestamp + config.duration,
            tokensPerDay: config.tokensPerDay,
            lastClaimedTime: block.timestamp
        }));
    }

    function claimRewards() external nonReentrant {
        UserMachine[] storage machines = userMachines[msg.sender];
        uint256 rewardTotal = 0;

        uint i = 0;
        while (i < machines.length) {
            UserMachine storage m = machines[i];
            uint256 claimUntil = _min(block.timestamp, m.endTime);

            if (claimUntil > m.lastClaimedTime) {
                uint256 elapsedSeconds = claimUntil - m.lastClaimedTime;
                uint256 reward = (elapsedSeconds * m.tokensPerDay) / 86400;
                rewardTotal += reward;
                m.lastClaimedTime = claimUntil;
            }

            if (m.lastClaimedTime >= m.endTime) {
                machines[i] = machines[machines.length - 1];
                machines.pop();
            } else {
                i++;
            }
        }

        require(rewardTotal > 0, "No rewards to claim");
        totalClaimed += rewardTotal;
        require(rewardToken.transfer(msg.sender, rewardTotal), "Reward transfer failed");
    }

    function getPendingRewards(address user) external view returns (uint256 total) {
        UserMachine[] memory machines = userMachines[user];
        for (uint i = 0; i < machines.length; i++) {
            UserMachine memory m = machines[i];
            uint256 claimUntil = _min(block.timestamp, m.endTime);
            if (claimUntil > m.lastClaimedTime) {
                uint256 elapsedSeconds = claimUntil - m.lastClaimedTime;
                total += (elapsedSeconds * m.tokensPerDay) / 86400;
            }
        }
    }

    function getUserMachines(address user) external view returns (UserMachine[] memory) {
        return userMachines[user];
    }

    function getActiveMachines() external view returns (uint256[] memory activeIds) {
        uint256 count = 0;
        for (uint256 i = 0; i < machineIndex; i++) {
            if (machineConfigs[i].active) {
                count++;
            }
        }

        activeIds = new uint256[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < machineIndex; i++) {
            if (machineConfigs[i].active) {
                activeIds[j] = i;
                j++;
            }
        }
    }

    function withdrawTokens(address _token , uint _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }

    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _min(uint a, uint b) internal pure returns (uint) {
        return a < b ? a : b;
    }

    function updateBuyToken(address _token) public onlyOwner{
        buyToken = IERC20(_token);
    }

    function updateRewardToken(address _token) public onlyOwner{
        rewardToken = IERC20(_token);
    }

     function updateTreasuryAddress(address _treasury) public onlyOwner{
        treasury = _treasury;
    }
}