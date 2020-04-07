require 'test_helper'

class Api::HomesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_homes_index_url
    assert_response :success
  end

  test "should get show" do
    get api_homes_show_url
    assert_response :success
  end

  test "should get new" do
    get api_homes_new_url
    assert_response :success
  end

  test "should get update" do
    get api_homes_update_url
    assert_response :success
  end

  test "should get create" do
    get api_homes_create_url
    assert_response :success
  end

end
