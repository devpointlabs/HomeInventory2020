require 'test_helper'

class MaintenancesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get maintenances_index_url
    assert_response :success
  end

  test "should get show" do
    get maintenances_show_url
    assert_response :success
  end

  test "should get update" do
    get maintenances_update_url
    assert_response :success
  end

  test "should get new" do
    get maintenances_new_url
    assert_response :success
  end

end
