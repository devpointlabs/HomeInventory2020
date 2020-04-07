require 'test_helper'

class Api::MaintenancesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_maintenances_index_url
    assert_response :success
  end

  test "should get show" do
    get api_maintenances_show_url
    assert_response :success
  end

  test "should get update" do
    get api_maintenances_update_url
    assert_response :success
  end

  test "should get new" do
    get api_maintenances_new_url
    assert_response :success
  end

end
