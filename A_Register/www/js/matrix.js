angular.module('app.matrix', [])

.service('matrix', [function(){

var matrix = {}

/*matrix that determines whether an element will show or not corresponding to a given user type or where
the page should route to. If a item is a html element the id will correspond to name above and will be used according to its index
If the matrix is used in the controller for routing the matrix will route according to the string listed above.
*/

//items =                   [terms_monitor, terms_fisher, terms_consentbox, termsCtrl_open_modal, termsCtrl_from_modal, termsCtrl_from_terms, mfc_landingsite1, mfc_landingsite2, mfc_landingsite3, mfc_co_op, personal_details_title_all, personal_details_title_co, personal_details_device_num, photoCtrl_from_photo

var role_fisher =           [false,         true,         true,             true,                 false,                false,                false,            false,            false,            false,     true,                       false,                     false,                       true]
var role_fisher_manager =   [false,         false,        false,            false,                false,                true,                 true,             false,            true,             false,     true,                       false,                     false,                       false]
var role_co_op =            [false,         true,         true,             true,                 true,                 false,                false,            false,            false,            true,      false,                      true,                      true,                        false]
var role_monitor =          [true,          false,        false,            true,                 true,                 false,                true,             true,             false,            false,     true,                       false,                     true,                        false]
var role_monitor_manager =  [false,         false,        false,            false,                false,                false,                false,            false,            false,            false,     true,                       false,                     false,                       false]
var role_demo_fisher =      [false,         true,         true,             true,                 false,                false,                false,            false,            false,            false,     true,                       false,                     false,                       true]
var role_demo_monitor =     [true,          false,        false,            true,                 true,                 false,                true,             true,             false,            false,     true,                       false,                     true,                        false]
var role_co_op_admin =      [false,         true,         true,             true,                 true,                 false,                false,            false,            false,            true,      false,                      true,                      true,                        false]


matrix.evaluate =  function (role, destination) {
  switch (role) {
  case 'fisher':
      return role_fisher[destination]

  case 'fisher_manager':
      return role_fisher_manager[destination]

  case 'co_op':
      return role_co_op[destination]

  case 'monitor':
      return role_monitor[destination]

  case 'monitor_manager':
      return role_monitor_manager[destination]

  case 'demo_fisher':
      return role_demo_fisher[destination]

  case 'demo_monitor':
     return role_demo_monitor[destination]

  case 'co_op_admin':
    return role_co_op_admin[destination]


}
  return

}

return matrix

}])
