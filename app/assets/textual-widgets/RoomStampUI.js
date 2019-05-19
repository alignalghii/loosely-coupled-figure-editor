function RoomStampUI(aDocument, roomBank, router)
{
	this.router = router;

	this.document = aDocument;
	this.roomBankSelectList = this.document.getElementById('sampleRoomBank');
	this.roomBank = roomBank;

	var roomBankSelectList = this.roomBankSelectList;
	function addToMenuItem (namedRoom, i) {createAndAppendChildWithAttrs(roomBankSelectList, 'option', {value: i}).innerHTML = namedRoom.name;}
	this.roomBank.namedRooms.map(addToMenuItem);
	roomBankSelectList.selectedIndex = roomBank.selected;
}

RoomStampUI.prototype.pipeToSM = function ()
{
	var roomStampUI = this;
	function changeStamp(event)
	{
		var i              = event.target.selectedIndex; // @TODO consider `parseInt(event.target.value)`
		var selectedRoom = roomStampUI.roomBank.namedRooms[i].room;
		roomStampUI.router.dispatch('change', ['Room'], {selectedRoom:selectedRoom});
	}
	this.roomBankSelectList.addEventListener('change', changeStamp);
};


