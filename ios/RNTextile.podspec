
Pod::Spec.new do |s|
  s.name         = "RNTextile"
  s.version      = "1.0.0"
  s.summary      = "RNTextile"
  s.description  = <<-DESC
                  RNTextile
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNTextile.git", :tag => "master" }
  s.source_files  = "RNTextile/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  