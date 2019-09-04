function RoomStampDriver(aDocument, roomBank)
{
	this.roomBankSelectList = aDocument.getElementById('sampleRoomBank');
	this.roomBank = roomBank;

	var roomBankSelectList = this.roomBankSelectList;
	function addToMenuItem (namedRoom, i) {createAndAppendChildWithAttrs(roomBankSelectList, 'option', {value: i}).innerHTML = namedRoom.name;}
	this.roomBank.namedRooms.map(addToMenuItem);
	roomBankSelectList.selectedIndex = roomBank.selected;
}

RoomStampDriver.prototype.pipeToSM = function (dispatch)
{
	const changeStamp = event =>
	{
		var i              = event.target.selectedIndex; // @TODO consider `parseInt(event.target.value)`
		var selectedRoom = this.roomBank.namedRooms[i].room;
		dispatch('change', ['Room'], {selectedRoom:selectedRoom});
	}
	this.roomBankSelectList.addEventListener('change', changeStamp);
};
