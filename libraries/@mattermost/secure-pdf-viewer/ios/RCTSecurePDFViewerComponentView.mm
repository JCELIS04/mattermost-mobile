#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTConversions.h>
#import <React/RCTComponentViewFactory.h>
#import <React/RCTFabricComponentsPlugins.h>

#import "SecurePDFViewerManager.h"
#import "react/renderer/components/SecurePdfViewer/ComponentDescriptors.h"
#import "react/renderer/components/SecurePdfViewer/EventEmitters.h"
#import "react/renderer/components/SecurePdfViewer/Props.h"
#import "react/renderer/components/SecurePdfViewer/RCTComponentViewHelpers.h"

#if __has_include("SecurePdfViewer-Swift.h")
#import "SecurePdfViewer-Swift.h"
#else
#import "secure_pdf_viewer-Swift.h"
#endif

using namespace facebook::react;

@interface SecurePdfViewerComponentViewObjC : RCTViewComponentView
@end

@implementation SecurePdfViewerComponentViewObjC {
  SharedSecurePdfViewerProps _props;
  SharedSecurePdfViewerEventEmitter _eventEmitter;
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    SecurePdfViewerComponentView *swiftView = [[SecurePdfViewerComponentView alloc] initWithFrame:frame];
    self.contentView = swiftView;
  }
  return self;
}

- (void)updateProps:(SharedProps)props oldProps:(SharedProps)oldProps {
  [super updateProps:props oldProps:oldProps];
  _props = std::static_pointer_cast<const SecurePdfViewerProps>(props);

  SecurePdfViewerComponentView *view = (SecurePdfViewerComponentView *)self.contentView;
  view.source = [NSString stringWithUTF8String:_props->source.c_str()];
  if (_props->password.has_value()) {
    view.password = [NSString stringWithUTF8String:_props->password->c_str()];
  }
  view.allowLinks = _props->allowLinks;
}

- (void)updateEventEmitter:(SharedEventEmitter)eventEmitter {
  [super updateEventEmitter:eventEmitter];
  _eventEmitter = std::static_pointer_cast<const SecurePdfViewerEventEmitter>(eventEmitter);

  SecurePdfViewerComponentView *view = (SecurePdfViewerComponentView *)self.contentView;

  view.onLinkPressed = ^(NSDictionary *payload) {
    _eventEmitter->onLinkPressed(payload);
  };
  view.onLinkPressedDisabled = ^ {
    _eventEmitter->onLinkPressedDisabled({});
  };
  view.onLoad = ^{
    _eventEmitter->onLoad({});
  };
  view.onPasswordRequired = ^(NSDictionary *payload) {
    _eventEmitter->onPasswordRequired(payload);
  };
  view.onPasswordFailed = ^(NSDictionary *payload) {
    _eventEmitter->onPasswordFailed(payload);
  };
  view.onPasswordFailureLimitReached = ^{
    _eventEmitter->onPasswordFailureLimitReached({});
  };
  view.onLoadError = ^(NSDictionary *payload) {
    _eventEmitter->onLoadError(payload);
  };
  view.onTap = ^(NSDictionary *payload) {
    _eventEmitter->onTap(payload);
  };
}

- (void)prepareForRecycle {
  [super prepareForRecycle];
  _props = nullptr;
  _eventEmitter = nullptr;
}

@end

Class<RCTComponentViewProtocol> SecurePdfViewerCls(void) {
  return SecurePdfViewerComponentViewObjC.class;
}

__attribute__((constructor)) static void RegisterSecurePdfViewerComponentView() {
  RCTRegisterComponentViewClass(SecurePdfViewerCls);
}

#endif
