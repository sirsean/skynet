class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  after_filter :store_return_to

  def redirect_back_or_default(default=nil)
    redirect_to(session[:return_to] || default)
    session.delete(:return_to)
  end

  def store_return_to
    session[:return_to] = request.fullpath
  end
end
