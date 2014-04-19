class Submission < ActiveRecord::Base
  self.per_page = 10
  mount_uploader :photo, PhotoUploader
  belongs_to :user

  def can_delete?(u)
    !u.nil? && (u == self.user || u.admin?)
  end

  def self.nearby(lat, long, miles)
    find_by_sql ["SELECT *, 
          SQRT(
            POW(69.1 * (latitude - ?), 2) +
            POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2)) AS distance
        FROM #{table_name} GROUP BY id HAVING (
          SQRT(
            POW(69.1 * (latitude - ?), 2) +
            POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2))
        )< ? ORDER BY distance ASC LIMIT 20", lat, long, lat, long, miles]
  end
end
