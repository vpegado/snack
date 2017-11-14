import template from './start.html';

const start = {
  template,
  controllerAs: 'ctrl',
  controller: class StartCtrl {

    constructor($mdSidenav) {
      'ngInject';
      this.$mdSidenav = $mdSidenav;
    }

    toggleSidebar () {
      this.$mdSidenav('left').toggle();
    }
  }
};

export { start };
